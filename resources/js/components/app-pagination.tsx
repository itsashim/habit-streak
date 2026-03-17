import { router } from "@inertiajs/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export default function PaginationWrapper({ links }: PaginationProps) {
    return (
        <Pagination>
            <PaginationContent>
                {links.map((link, i) => {
                    // Previous button
                    if (link.label.includes("Previous")) {
                        return (
                            <PaginationItem key={i}>
                                {link.url ? (
                                    <PaginationPrevious href={link.url ?? "#"} onClick={(e) => {
                                        e.preventDefault();

                                        if (link.url) {
                                            router.visit(link.url);
                                        }
                                    }}>
                                        <ChevronLeftIcon data-icon="inline-end" />
                                        Previous
                                    </PaginationPrevious>
                                ) : (
                                    <PaginationPrevious className="pointer-events-none opacity-50" />
                                )}
                            </PaginationItem>
                        );
                    }

                    // Next button
                    if (link.label.includes("Next")) {
                        return (
                            <PaginationItem key={i}>
                                {link.url ? (
                                    <PaginationNext href={link.url ?? "#"} onClick={(e) => {
                                        e.preventDefault();

                                        if (link.url) {
                                            router.visit(link.url);
                                        }
                                    }}>
                                        Next
                                        <ChevronRightIcon data-icon="inline-end" />
                                    </PaginationNext>
                                ) : (
                                    <PaginationNext className="pointer-events-none opacity-50" />
                                )}
                            </PaginationItem>
                        );
                    }

                    // Page numbers
                    return (
                        <PaginationItem key={i}>
                            {link.url ? (
                                <PaginationLink
                                    href={link.url ?? "#"}
                                    isActive={link.active}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        if (link.url) {
                                            router.visit(link.url);
                                        }
                                    }}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <PaginationLink
                                    isActive={link.active}
                                    className="pointer-events-none opacity-50"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            )}
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}
