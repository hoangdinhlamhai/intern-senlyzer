'use client';

import styles from "./Search.module.css";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
            params.set('page', '1'); // reset về trang 1 khi thay query
        } else {
            params.delete('query');
            params.set('page', '1'); // vẫn về trang 1
        }
        const qs = params.toString();
        replace(`${pathname}${qs ? `?${qs}` : ''}`);
    }

    return (
        <div className={styles.searchBox}>
        <input
            type="text"
            placeholder={placeholder}
            className={styles.searchInput}
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get('query') ?? ''}
        />
        <span className={styles.icon}>🔍</span>
        </div>
    );
}

export default Search;
