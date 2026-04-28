import { StepPassword } from '@/sections/auth/SignUpForm/steps/StepPassword/StepPassword';
import { StepPersonal } from '@/sections/auth/SignUpForm/steps/StepPersonal/StepPersonal';
import { StepVerify } from '@/sections/auth/SignUpForm/steps/StepVerify/StepVerify';

export const STEPS = [1, 2, 3] as const;
export type Step = (typeof STEPS)[number];

export const stepsMap = {
    1: StepPersonal,
    2: StepPassword,
    3: StepVerify,
} as const;