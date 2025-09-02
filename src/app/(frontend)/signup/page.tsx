import { SignupCard } from '@/components/signup/signup-card';

export default async function SignUpPage() {
  return (
    <div className="relative flex items-center justify-center min-h-dvh p-6 md:p-12 overflow-hidden">
      <SignupCard />
      <svg
        className="absolute bottom-0 left-0 w-full z-[-1] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        aria-hidden="true"
      >
        <path
          fill="#fb2c36"
          fillOpacity="1"
          d="M0,0L48,16C96,32,192,64,288,106.7C384,149,480,203,576,218.7C672,235,768,213,864,186.7C960,160,1056,128,1152,106.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
