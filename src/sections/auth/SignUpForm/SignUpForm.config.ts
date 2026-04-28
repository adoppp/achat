import { StepPersonal } from '@/sections/auth/SignUpForm/steps/StepPersonal/StepPersonal';
import { StepPassword } from '@/sections/auth/SignUpForm/steps/StepPassword/StepPassword';
import { StepVerify } from '@/sections/auth/SignUpForm/steps/StepVerify/StepVerify';

export const stepsMap = {
    1: StepPersonal,
    2: StepPassword,
    3: StepVerify,
} as const;