import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import ThemeToggle from '@/components/theme-toggle';
import type { AppLayoutProps } from '@/types';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
        <ThemeToggle />
    </AppLayoutTemplate>
);
