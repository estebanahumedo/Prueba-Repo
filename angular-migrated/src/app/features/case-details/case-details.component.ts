import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { POTENTIAL_PROVIDERS } from '../../data/providers';
import {
  Case,
  MilestoneState,
  MilestoneStatus,
  ServiceDetail,
  ServiceType,
} from '../../models/types';

@Component({
  selector: 'app-case-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './case-details.component.html',
  styleUrl: './case-details.component.css',
})
export class CaseDetailsComponent implements OnChanges {
  @Input({ required: true }) caseData!: Case;
  @Output() back = new EventEmitter<void>();
  @Output() updateMilestone = new EventEmitter<{
    caseId: string;
    serviceId: string;
    key: string;
    data: MilestoneState;
  }>();
  @Output() addService = new EventEmitter<{
    caseId: string;
    service: Omit<ServiceDetail, 'id'>;
  }>();
  @Output() deleteService = new EventEmitter<{
    caseId: string;
    serviceId: string;
  }>();

  services: ServiceDetail[] = [];
  expandedServiceIds = new Set<string>();
  providerMenuServiceId: string | null = null;
  editingMilestone: {
    serviceId: string;
    milestoneKey: string;
    label: string;
  } | null = null;
  milestoneResult: 'novelty' | 'managed' = 'managed';
  milestoneObservation = '';

  showAddForm = false;
  newService: {
    authNumber: string;
    serviceType: ServiceType;
    description: string;
    providerName: string;
  } = {
    authNumber: '',
    serviceType: 'Conductor elegido',
    description: '',
    providerName: '',
  };

  readonly providers = POTENTIAL_PROVIDERS;
  readonly milestones = [
    { label: 'Confirmación', key: 'confirmacion' },
    { label: '50%', key: 'seguimiento50' },
    { label: '75%', key: 'seguimiento75' },
    { label: '100%', key: 'seguimiento100' },
    { label: '200%', key: 'seguimiento200' },
    { label: 'Reporte', key: 'reporte' },
  ];

  readonly serviceTypes: ServiceType[] = [
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['caseData']) {
      this.services = [...this.caseData.services];
    }
  }

  toggleServiceExpand(serviceId: string): void {
    if (this.expandedServiceIds.has(serviceId)) {
      this.expandedServiceIds.delete(serviceId);
    } else {
      this.expandedServiceIds.add(serviceId);
    }
  }

  isServiceExpanded(serviceId: string): boolean {
    return this.expandedServiceIds.has(serviceId);
  }

  onProviderSelect(serviceId: string, providerName: string): void {
    const service = this.services.find((s) => s.id === serviceId);
    if (service) {
      service.providerName = providerName;
    }
    this.providerMenuServiceId = null;
  }

  openMilestoneEdit(
    serviceId: string,
    key: string,
    label: string
  ): void {
    this.editingMilestone = { serviceId, milestoneKey: key, label };
    this.milestoneResult = 'managed';
    this.milestoneObservation = '';
  }

  saveMilestone(): void {
    if (!this.editingMilestone) {
      return;
    }

    const milestoneData: MilestoneState = {
      status: this.milestoneResult === 'managed' ? 'completed' : 'pending',
      observation: this.milestoneObservation,
    };

    this.updateMilestone.emit({
      caseId: this.caseData.id,
      serviceId: this.editingMilestone.serviceId,
      key: this.editingMilestone.milestoneKey,
      data: milestoneData,
    });

    this.editingMilestone = null;
  }

  getMilestoneStatus(service: ServiceDetail, key: string): MilestoneStatus {
    const milestone = (service.metadata?.[key] as MilestoneState) || null;
    if (!milestone) return 'none';
    return milestone.status;
  }

  deleteCurrentService(serviceId: string): void {
    if (confirm('¿Está seguro de que desea eliminar este servicio?')) {
      this.deleteService.emit({
        caseId: this.caseData.id,
        serviceId,
      });
    }
  }

  saveNewService(): void {
    if (!this.newService.authNumber.trim()) {
      return;
    }

    this.addService.emit({
      caseId: this.caseData.id,
      service: {
        authNumber: this.newService.authNumber,
        serviceType: this.newService.serviceType,
        description: this.newService.description,
        providerName: this.newService.providerName,
      },
    });

    this.newService = {
      authNumber: '',
      serviceType: 'Conductor elegido',
      description: '',
      providerName: '',
    };
    this.showAddForm = false;
  }

  cancelNewService(): void {
    this.showAddForm = false;
    this.newService = {
      authNumber: '',
      serviceType: 'Conductor elegido',
      description: '',
      providerName: '',
    };
  }
}
