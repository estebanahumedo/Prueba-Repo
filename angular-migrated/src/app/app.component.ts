import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { INITIAL_CASES } from './data/initial-cases';
import { CaseDetailsComponent } from './features/case-details/case-details.component';
import { CreateCaseComponent } from './features/create-case/create-case.component';
import {
  Case,
  CaseStatus,
  HistoryEntry,
  MilestoneState,
  MilestoneStatus,
  ServiceDetail,
} from './models/types';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    CreateCaseComponent,
    CaseDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly CaseStatus = CaseStatus;

  view: 'dashboard' | 'create' | 'details' = 'dashboard';
  selectedCase: Case | null = null;

  cases: Case[] = INITIAL_CASES;
  expandedId: string | null = null;
  editingMilestone: {
    caseId: string;
    serviceId: string;
    milestoneKey: string;
    label: string;
  } | null = null;
  historyService: {
    caseId: string;
    serviceId: string;
    label: string;
    history: HistoryEntry[];
  } | null = null;
  milestoneResult: 'novelty' | 'managed' = 'managed';
  milestoneObservation = '';
  newObservation = '';
  toastMessage = '';

  readonly milestones = [
    { key: 'confirmacion', label: 'C' },
    { key: 'seguimiento50', label: '50' },
    { key: 'seguimiento75', label: '75' },
    { key: 'seguimiento100', label: '100' },
    { key: 'seguimiento200', label: '200' },
    { key: 'reporte', label: 'R' },
  ];

  get pendingCasesCount(): number {
    return this.cases.filter((item) => item.status === CaseStatus.PENDING)
      .length;
  }

  get inProgressCasesCount(): number {
    return this.cases.filter((item) => item.status === CaseStatus.IN_PROGRESS)
      .length;
  }

  get servicedCasesCount(): number {
    return this.cases.filter((item) => item.status === CaseStatus.SERVICED)
      .length;
  }

  toggleExpand(caseId: string): void {
    this.expandedId = this.expandedId === caseId ? null : caseId;
  }

  getStatusStyle(status: CaseStatus): string {
    switch (status) {
      case CaseStatus.PENDING:
        return 'bg-amber-100 text-amber-700';
      case CaseStatus.SERVICED:
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case CaseStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case CaseStatus.CANCELLED:
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  getMilestoneColor(status: MilestoneStatus): string {
    switch (status) {
      case 'completed':
        return 'bg-emerald-600 text-white shadow-emerald-600/20';
      case 'pending':
        return 'bg-amber-400 text-white shadow-amber-400/20';
      case 'expired':
        return 'bg-red-500 text-white shadow-red-500/20';
      default:
        return 'bg-gray-100 text-gray-300';
    }
  }

  getMilestoneStatus(service: ServiceDetail, key: string): MilestoneStatus {
    const milestone = service.metadata?.[key] as MilestoneState | undefined;
    return milestone?.status ?? 'none';
  }

  isMilestoneEditable(service: ServiceDetail, key: string): boolean {
    const status = this.getMilestoneStatus(service, key);
    return status === 'pending' || status === 'expired';
  }

  openMilestoneModal(
    caseId: string,
    serviceId: string,
    milestoneKey: string,
    label: string,
  ): void {
    this.editingMilestone = { caseId, serviceId, milestoneKey, label };
    this.milestoneResult = 'managed';
    this.milestoneObservation = '';
  }

  closeMilestoneModal(): void {
    this.editingMilestone = null;
    this.milestoneObservation = '';
  }

  saveMilestone(): void {
    if (!this.editingMilestone) {
      return;
    }

    this.updateCaseMilestone(
      this.editingMilestone.caseId,
      this.editingMilestone.serviceId,
      this.editingMilestone.milestoneKey,
      {
        status: 'completed',
        result: this.milestoneResult,
        observation: this.milestoneObservation,
      },
    );

    this.closeMilestoneModal();
  }

  updateCaseMilestone(
    caseId: string,
    serviceId: string,
    milestoneKey: string,
    milestoneData: MilestoneState,
  ): void {
    const historyEntry: HistoryEntry = {
      id: Math.random().toString(36).slice(2, 11),
      date: new Date().toLocaleString(),
      user: 'Usuario Actual',
      type: 'change',
      description: `Hito ${milestoneKey} actualizado: ${milestoneData.result ?? 'Completado'}. Obs: ${milestoneData.observation ?? 'Sin observacion'}`,
    };

    this.cases = this.cases.map((currentCase) => {
      if (currentCase.id !== caseId) {
        return currentCase;
      }

      return {
        ...currentCase,
        services: currentCase.services.map((service) => {
          if (service.id !== serviceId) {
            return service;
          }

          return {
            ...service,
            metadata: {
              ...service.metadata,
              [milestoneKey]: milestoneData,
            },
            history: [...(service.history ?? []), historyEntry],
          };
        }),
      };
    });
  }

  openHistoryModal(currentCase: Case, service: ServiceDetail): void {
    this.historyService = {
      caseId: currentCase.id,
      serviceId: service.id,
      label: `${service.serviceType} - ${service.authNumber}`,
      history: service.history ?? [],
    };
    this.newObservation = '';
  }

  closeHistoryModal(): void {
    this.historyService = null;
    this.newObservation = '';
  }

  addObservationToHistory(): void {
    const observation = this.newObservation.trim();
    if (!this.historyService || !observation) {
      return;
    }

    const newEntry: HistoryEntry = {
      id: Math.random().toString(36).slice(2, 11),
      date: new Date().toLocaleString(),
      user: 'Usuario Actual',
      type: 'observation',
      description: observation,
    };

    this.cases = this.cases.map((currentCase) => {
      if (currentCase.id !== this.historyService?.caseId) {
        return currentCase;
      }

      return {
        ...currentCase,
        services: currentCase.services.map((service) => {
          if (service.id !== this.historyService?.serviceId) {
            return service;
          }

          return {
            ...service,
            history: [...(service.history ?? []), newEntry],
          };
        }),
      };
    });

    if (this.historyService) {
      this.historyService = {
        ...this.historyService,
        history: [...this.historyService.history, newEntry],
      };
    }

    this.newObservation = '';
  }

  showMigrationToast(moduleName: string): void {
    this.toastMessage = `${moduleName} se encuentra en migracion a Angular.`;
    window.setTimeout(() => {
      this.toastMessage = '';
    }, 2400);
  }

  openCreateCase(): void {
    this.view = 'create';
  }

  openCaseDetails(caseItem: Case): void {
    this.selectedCase = caseItem;
    this.view = 'details';
  }

  onCreateCanceled(): void {
    this.view = 'dashboard';
  }

  onCaseCreated(newCase: Case): void {
    this.cases = [newCase, ...this.cases];
    this.selectedCase = newCase;
    this.expandedId = null;
    this.view = 'dashboard';
  }

  returnToDashboard(): void {
    this.selectedCase = null;
    this.view = 'dashboard';
  }

  addServiceToCase(payload: {
    caseId: string;
    service: Omit<ServiceDetail, 'id'>;
  }): void {
    const newService: ServiceDetail = {
      ...payload.service,
      id: `s-${Date.now()}`,
    };

    this.cases = this.cases.map((currentCase) => {
      if (currentCase.id !== payload.caseId) {
        return currentCase;
      }

      return {
        ...currentCase,
        services: [...currentCase.services, newService],
      };
    });

    if (this.selectedCase?.id === payload.caseId) {
      this.selectedCase = {
        ...this.selectedCase,
        services: [...this.selectedCase.services, newService],
      };
    }
  }

  deleteServiceFromCase(payload: { caseId: string; serviceId: string }): void {
    this.cases = this.cases.map((currentCase) => {
      if (currentCase.id !== payload.caseId) {
        return currentCase;
      }

      return {
        ...currentCase,
        services: currentCase.services.filter(
          (service) => service.id !== payload.serviceId,
        ),
      };
    });

    if (this.selectedCase?.id === payload.caseId) {
      this.selectedCase = {
        ...this.selectedCase,
        services: this.selectedCase.services.filter(
          (service) => service.id !== payload.serviceId,
        ),
      };
    }
  }

  handleMilestoneUpdated(payload: {
    caseId: string;
    serviceId: string;
    key: string;
    data: MilestoneState;
  }): void {
    this.updateCaseMilestone(
      payload.caseId,
      payload.serviceId,
      payload.key,
      payload.data,
    );

    const updatedCase =
      this.cases.find((item) => item.id === payload.caseId) || null;
    if (updatedCase) {
      this.selectedCase = updatedCase;
    }
  }
}
