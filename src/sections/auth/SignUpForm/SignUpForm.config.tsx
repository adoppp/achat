import { StepPassword } from '@/sections/auth/SignUpForm/steps/StepPassword/StepPassword';
import { StepPersonal } from '@/sections/auth/SignUpForm/steps/StepPersonal/StepPersonal';
import { StepVerify } from '@/sections/auth/SignUpForm/steps/StepVerify/StepVerify';
import type { StepFormProps, StepPasswordProps } from './SignUpForm.types';

export const STEPS = [1, 2, 3] as const;
export type Step = (typeof STEPS)[number];

export const stepComponents = {
    1: (props: StepFormProps) => <StepPersonal {...props} />,
    2: (props: StepPasswordProps) => <StepPassword {...props} />,
    3: () => <StepVerify />,
} as const;