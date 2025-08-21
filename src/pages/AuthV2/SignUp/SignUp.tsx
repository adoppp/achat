import { useState, type FC, type ReactElement } from "react";

const SignUp: FC = (): ReactElement => {
    const [step, setStep] = useState<number>(1);

    const _next = () => setStep(step + 1);

    const _perv = () => setStep(step - 1);

    const Steps: FC = (): ReactElement => {
        switch (step) {
            case 1:
                return (
                    <div>
                        step 1
                        <button onClick={_perv} disabled>
                            perv
                        </button>
                        <button onClick={_next}>
                            next
                        </button>
                    </div>
                );
            
            case 2:
                return (
                    <div>
                        step 2
                        <button onClick={_perv}>
                            perv
                        </button>
                        <button onClick={_next}>
                            next
                        </button>
                    </div>
                );
        
            default:
                return (
                    <div>
                        Error in Steps
                    </div>
                )
        };
    };

    return (
        <section>
            <Steps />
        </section>
    )
};

export default SignUp;