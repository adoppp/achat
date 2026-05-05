import { StepPassword } from '@/sections/auth/SignUpForm/steps/StepPassword/StepPassword';
import { StepPersonal } from '@/sections/auth/SignUpForm/steps/StepPersonal/StepPersonal';
import { StepVerify } from '@/sections/auth/SignUpForm/steps/StepVerify/StepVerify';
import type { BaseStepProps, StepFormProps, StepPasswordProps } from './SignUpForm.types';
import { IconEmail, IconLock, IconUser } from '@/assets/svg';

export const STEPS = [1, 2, 3] as const;
export type Step = (typeof STEPS)[number];

export const stepComponents = {
    1: (props: StepFormProps) => <StepPersonal {...props} />,
    2: (props: StepPasswordProps) => <StepPassword {...props} />,
    3: (props: BaseStepProps) => <StepVerify {...props} />,
} as const;

export const stepIcons = {
    1: IconUser,
    2: IconLock,
    3: IconEmail
} as const;