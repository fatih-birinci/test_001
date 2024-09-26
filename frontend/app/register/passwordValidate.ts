// passwordValidator.ts

type PasswordRequirement = {
    isCompliant: (password: string) => boolean;
    errorMessage: string;
  };
  
  export const passwordRequirements: PasswordRequirement[] = [
    {
      isCompliant: (password) => password.length >= 8,
      errorMessage: 'Minimum Length: 8 characters',
    },
    {
      isCompliant: (password) => password.length <= 64,
      errorMessage: 'Maximum Length: 64 characters',
    },
    {
      isCompliant: (password) => /[A-Z]/.test(password),
      errorMessage: 'At Least One Uppercase Letter: (A-Z)',
    },
    {
      isCompliant: (password) => /[a-z]/.test(password),
      errorMessage: 'At Least One Lowercase Letter: (a-z)',
    },
    {
      isCompliant: (password) => /[0-9]/.test(password),
      errorMessage: 'At Least One Digit: (0-9)',
    },
    {
      isCompliant: (password) => /[!@#$%^&*]/.test(password),
      errorMessage: 'At Least One Special Character: (e.g., !, @, #, $, %, ^, &, *)',
    },
  ];
  
  export function validatePassword(password: string): string[] {
    const errors: string[] = [];
    for (const requirement of passwordRequirements) {
      if (!requirement.isCompliant(password)) {
        errors.push(requirement.errorMessage);
      }
    }
    return errors;
  }