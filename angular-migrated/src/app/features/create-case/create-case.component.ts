import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MOCK_CUSTOMERS } from '../../data/mock-customers';
import { POTENTIAL_PROVIDERS } from '../../data/providers';
import { getServiceFields } from '../../config/serviceFieldsConfig';
import {
  Case,
  CaseStatus,
  Customer,
  Policy,
  ServiceDetail,
  ServiceType,
} from '../../models/types';

interface SearchResult {
  customer: Customer;
  policy: Policy;
}

interface ServiceFormState {
  id: number;
  authNumber: string;
  serviceType: ServiceType;
  metadata: Record<string, unknown>;
}

const BLACKLIST_CUSTOMERS = [
  {
    cc: '1020304050',
    reason: 'Historial de reclamaciones frecuentes',
  },
];

@Component({
  selector: 'app-create-case',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-case.component.html',
  styleUrl: './create-case.component.css',
})
export class CreateCaseComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Case>();

  searchTerm = '';
  isSearching = false;
  searchResults: SearchResult[] = [];
  selectedResult: SearchResult | null = null;
  selectedServiceType: ServiceType | '' = '';
  selectedProvider = '';

  serviceForms: ServiceFormState[] = [
    {
      id: 1,
      authNumber: '',
      serviceType: 'Conductor elegido',
      metadata: {},
    },
  ];

  readonly generatedCaseNumber = `4${Math.floor(Math.random() * 90000) + 10000}`;
  readonly providers = POTENTIAL_PROVIDERS;

  get isCustomerBlacklisted(): boolean {
    return BLACKLIST_CUSTOMERS.some(
      (c) => c.cc === this.selectedResult?.customer.cc,
    );
  }

  get availableServices(): ServiceType[] {
    const fromPolicy = this.selectedResult?.policy.enabledServices;
    if (fromPolicy?.length) {
      return fromPolicy;
    }

    return [
      'Conductor elegido',
      'Conductor Familiar',
      'Trasporte para viajes',
      'Trasporte de producto',
      'Transporte ocupantes al destino/domicilio',
      'translado documentos y mercancía',
      'Abogado: Asistencia presencial',
      'Abogado: Asistencia telefónica',
      'Cerrajería autos',
      'Carro taller por barada',
      'Carro taller instalación de batería',
      'Móvil presencial (CESVI)',
      'Deposito/custodia',
      'Grúa salida custodia',
      'Grua accidente',
      'Gra accedente pesados',
      'Grua varada',
      'Grua varada pesados',
      'moto grua',
      'Rescate',
    ];
  }

  consult(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.searchResults = [];
      this.selectedResult = null;
      return;
    }

    this.isSearching = true;
    window.setTimeout(() => {
      this.searchResults = MOCK_CUSTOMERS.flatMap((customer) =>
        customer.policies
          .filter((policy) => {
            const byDocument = customer.cc.toLowerCase().includes(term);
            const byPlate = policy.vehiclePlate?.toLowerCase().includes(term);
            const byPolicy = policy.number.toLowerCase().includes(term);
            return byDocument || !!byPlate || byPolicy;
          })
          .map((policy) => ({ customer, policy })),
      );

      this.isSearching = false;
    }, 250);
  }

  selectResult(result: SearchResult): void {
    this.selectedResult = result;
    const firstService = result.policy.enabledServices?.[0];
    this.selectedServiceType = firstService ?? 'Conductor elegido';

    this.serviceForms = [
      {
        id: 1,
        authNumber: '',
        serviceType: this.selectedServiceType || 'Conductor elegido',
        metadata: {},
      },
    ];
  }

  addService(): void {
    const fallback = this.availableServices[0] ?? 'Conductor elegido';
    const type = this.selectedServiceType || fallback;

    this.serviceForms.push({
      id: Date.now(),
      authNumber: '',
      serviceType: type,
      metadata: {},
    });
  }

  removeService(id: number): void {
    if (this.serviceForms.length === 1) {
      return;
    }

    this.serviceForms = this.serviceForms.filter(
      (service) => service.id !== id,
    );
  }

  serviceFields(type: ServiceType) {
    return getServiceFields(type);
  }

  updateMetadata(serviceId: number, fieldName: string, value: unknown): void {
    this.serviceForms = this.serviceForms.map((service) =>
      service.id === serviceId
        ? {
            ...service,
            metadata: {
              ...service.metadata,
              [fieldName]: value,
            },
          }
        : service,
    );
  }

  trackByServiceId(index: number, service: ServiceFormState): number {
    return service.id;
  }

  registerCase(): void {
    if (!this.selectedResult) {
      return;
    }

    const missingAuth = this.serviceForms.some(
      (service) => !service.authNumber.trim(),
    );
    if (missingAuth) {
      return;
    }

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const months = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];
    const dateText = `${day} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const timeText = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const services: ServiceDetail[] = this.serviceForms.map((item, idx) => ({
      id: `srv-${Date.now()}-${idx}`,
      authNumber: item.authNumber,
      serviceType: item.serviceType,
      description: `${item.serviceType} - generado en apertura de caso`,
      metadata: {
        ...item.metadata,
        confirmacion: { status: 'pending' },
        seguimiento50: { status: 'none' },
        seguimiento75: { status: 'none' },
        seguimiento100: { status: 'none' },
        seguimiento200: { status: 'none' },
        reporte: { status: 'none' },
      },
    }));

    const policy = this.selectedResult.policy;
    const customer = this.selectedResult.customer;

    const newCase: Case = {
      id: `c-${Date.now()}`,
      systemId: Math.floor(Math.random() * 900) + 100,
      siabNumber: this.generatedCaseNumber,
      plate: policy.vehiclePlate || customer.cc,
      status: CaseStatus.PENDING,
      requestDate: dateText,
      requestTime: timeText,
      channel: 'APP',
      responsable: 'Mesa Operativa',
      assignedQueue:
        policy.policyType === 'HOGAR' ? 'Hogar' : 'Asistencia Local',
      services,
      vehicleInfo:
        policy.policyType === 'AUTOS'
          ? {
              brand: policy.vehicleBrand || 'N/A',
              model: policy.vehicleModel || 'N/A',
              color: policy.vehicleColor || 'N/A',
            }
          : undefined,
      personalInfo: {
        documentType: customer.cc.length > 10 ? 'NIT' : 'Cédula de Ciudadanía',
        cc: customer.cc,
        name: customer.name,
        personType: customer.cc.length > 10 ? 'Juridica' : 'Natural',
        phone: customer.phone,
        email: customer.email,
      },
      policyInfo: {
        productCode: policy.productCode || '-',
        productName: policy.productName || policy.type,
        branchName: policy.branchName || '-',
        number: policy.number,
        sequenceNumber: policy.sequenceNumber || '-',
        height: policy.height || '-',
        startDate: policy.startDate || '-',
        endDate: policy.endDate || policy.validity,
        insuredValue: policy.insuredValue || '-',
        status: policy.status,
        agentKey: policy.agentKey || '-',
        validity: policy.validity,
        type: policy.type,
      },
      additionalInfo: {
        department: 'N/A',
        city: customer.city,
        address: customer.address,
        damageDescription: 'Caso registrado desde migracion Angular',
      },
    };

    this.save.emit(newCase);
  }
}
