import { createInitialMockData } from '../../../utils/mockData';
import { Navbar } from '../../../components/layout';
import { PageHeader, ProductCard } from '../../../components/common';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import '../../../app/styles/app.css';

function AllProducts() {
	const { products } = createInitialMockData();
	const navigate = useNavigate();
	const { isAuthenticated, role } = useAuth();

	const publicNavItems = [
		{ to: '/', label: '🏠 Home' },
		{ to: '/login', label: '🔐 Login' },
		{ to: '/customer/home', label: '🛒 Customer' },
		{ to: '/seller/dashboard', label: '🏪 Seller' }
	];

	const handleProductCardClick = () => {
		if (!isAuthenticated) {
			navigate('/login');
			return;
		}

		navigate(role === 'SELLER' ? '/seller/dashboard' : '/customer/home');
	};

	return (
		<div className="app-shell">
			<Navbar navItems={publicNavItems} />

			<main className="app-content">
				<section className="panel">
					<PageHeader title="All Products" subtitle={`${products.length} items available`} />

					<div className="card-grid">
						{products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onCardClick={handleProductCardClick}
								onAdd={handleProductCardClick}
							/>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}

export default AllProducts;