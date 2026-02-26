import { toTitleCase } from '../../utils/formatters.js';
import { PRODUCT_CATEGORIES } from '../../utils/constants.js';

/**
 * CategoryFilter – horizontal category tab/pill selector.
 *
 * value    – currently active category ('ALL' or a PRODUCT_CATEGORIES value)
 * onChange – (category: string) => void
 */
const ALL_CATEGORIES = [
  { value: 'ALL', label: 'All', icon: '🍽️' },
  ...Object.values(PRODUCT_CATEGORIES).map((cat) => ({
    value: cat,
    label: toTitleCase(cat),
    icon: cat === 'PIZZA' ? '🍕' : cat === 'DRINK' ? '🥤' : cat === 'BREAD' ? '🍞' : '🍴',
  })),
];

function CategoryFilter({ value = 'ALL', onChange }) {
  return (
    <div
      role="group"
      aria-label="Filter by category"
      style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
      }}
    >
      {ALL_CATEGORIES.map((cat) => {
        const isActive = value === cat.value;
        return (
          <button
            key={cat.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange?.(cat.value)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.85rem',
              borderRadius: '999px',
              border: '1px solid',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: isActive ? 600 : 400,
              transition: 'all 0.12s ease',
              background: isActive ? '#2563eb' : '#f8fafc',
              color:      isActive ? '#fff'     : '#334155',
              borderColor:isActive ? '#2563eb'  : '#d0d7e2',
            }}
          >
            <span aria-hidden="true">{cat.icon}</span>
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
