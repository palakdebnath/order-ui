import { render, screen } from '@testing-library/react';
import StatusBadge from './StatusBadge.jsx';

describe('StatusBadge', () => {
  it('renders a label for a known status', () => {
    render(<StatusBadge status="COMPLETED" />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('falls back to the raw status text for an unknown status', () => {
    render(<StatusBadge status="ON_HOLD" />);
    expect(screen.getByText('ON_HOLD')).toBeInTheDocument();
  });
});
