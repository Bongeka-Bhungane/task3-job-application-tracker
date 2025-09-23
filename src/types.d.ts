export type Job = {
  id: number;
  title: string;
  company: string;
  applicationDate: string;
  status: "applied" | "interviewed" | "denied";
  contactInfo: string;
  location?: string;
  description?: string;
  requirements?: string;
  duties?: string;
  notes?: string;
};

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  jobs: Job[];
};
