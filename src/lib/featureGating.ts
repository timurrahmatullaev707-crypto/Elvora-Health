import { SubscriptionPlan, PlanFeature } from '../types';

/**
 * PLAN GATING SYSTEM
 *
 * Basic: Core clinic operations (patients, appointments, basic queue, basic finance)
 * Pro: Adds Elvora Insights, advanced analytics, detailed reports, extended exports, automation rules
 * Business: Adds multi-branch architecture, custom roles, consolidated cross-branch reports, audit log
 */

const PLAN_FEATURES: Record<SubscriptionPlan, PlanFeature[]> = {
  basic: [],
  pro: [
    'insights',
    'advanced_reports',
    'exports_extended',
    'automation_rules',
  ],
  business: [
    'insights',
    'advanced_reports',
    'exports_extended',
    'automation_rules',
    'multi_branch',
    'custom_roles',
    'audit_log',
  ],
};

export function hasFeature(plan: SubscriptionPlan, feature: PlanFeature): boolean {
  return PLAN_FEATURES[plan]?.includes(feature) ?? false;
}

export function getFeatureTitleUz(feature: PlanFeature): string {
  switch (feature) {
    case 'insights':
      return 'Elvora Insights™ Tahliliy Moduli';
    case 'advanced_reports':
      return 'Kengaytirilgan Davriy Hisobotlar';
    case 'exports_extended':
      return 'To‘liq Excel (CSV) va PDF Eksport';
    case 'automation_rules':
      return 'SMS & Telegram Eslatmalari Avtomatizatsiyasi';
    case 'multi_branch':
      return 'Ko‘p Filialli Boshqaruv (Multi-Branch)';
    case 'custom_roles':
      return 'Moslashuvchan Xodimlar Ruxsatnomasi';
    case 'audit_log':
      return 'Tizimdagi Amallar Xavfsizlik Tarixi (Audit Log)';
    default:
      return feature;
  }
}
