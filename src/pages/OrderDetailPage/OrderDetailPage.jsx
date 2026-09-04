import { useParams } from 'react-router-dom';

// Placeholder destination for row-click navigation from OrdersPage; full detail page is a separate story.
export default function OrderDetailPage() {
  const { orderId } = useParams();
  return (
    <main>
      <h1>Order #{orderId}</h1>
      <p>Order detail view is not yet implemented.</p>
    </main>
  );
}
