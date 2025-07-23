import { XIcon } from "lucide-react";
import styles from "./styles.module.css";
import { CallToAction } from "quirk-ui";
import { ArticleItem } from "@/types";

interface CategoryFiltersProps {
  categoryFilters: { _id: string; title: string }[];
  selectedCategories: string[];
  setSelectedCategories: (cats: string[]) => void;
  setArticles: React.Dispatch<React.SetStateAction<ArticleItem[]>>;
  setStart: React.Dispatch<React.SetStateAction<number>>;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  showFilters: boolean;
  toggleFilters: () => void;
  isLoading: boolean;
}

export function CategoryFilters({
  categoryFilters,
  selectedCategories,
  setSelectedCategories,
  setArticles,
  setStart,
  setHasMore,
  showFilters,
  toggleFilters,
  isLoading,
}: CategoryFiltersProps) {
  return (
    <div
      className={`${styles.listFilters} ${showFilters ? styles.show : styles.hide}`}
    >
      <div className={styles.filterHeader}>
        <h5>Filters</h5>
        <button onClick={() => toggleFilters()}>
          <XIcon size={24} />
        </button>
      </div>
      <div className={styles.filterList}>
        {categoryFilters?.map((filter) => (
          <label key={filter._id}>
            <input
              type="checkbox"
              value={filter._id}
              checked={selectedCategories.includes(filter._id)}
              onChange={(e) => {
                const checked = e.target.checked;
                const newSelection = checked
                  ? [...selectedCategories, filter._id]
                  : selectedCategories.filter((f) => f !== filter._id);

                setArticles([]);
                setStart(0);
                setHasMore(true);
                setSelectedCategories(newSelection);
              }}
            />
            {filter.title}
          </label>
        ))}
      </div>

      <CallToAction
        as="button"
        variant="secondary"
        onClick={toggleFilters}
        disabled={isLoading}
        className={styles.applyFilters}
      >
        Apply Filters
      </CallToAction>
    </div>
  );
}
