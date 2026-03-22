export type PaginatedData<T> = {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};

export type Habit = {
  id: number;
  name: string;
  description?: string | null;
  tracked_today?: Date;
};
