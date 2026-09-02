export interface CaseRequirements {
  rps: number;
  consistency: string;
  budget: string;
  teamSize: number;
  deadlineWeeks: number;
  dataLossTolerance: string;
}

export const projectRequirements: CaseRequirements = {
  rps: 1000,
  consistency: 'strict',
  budget: 'small',
  teamSize: 8,
  deadlineWeeks: 8,
  dataLossTolerance: 'zero'
};