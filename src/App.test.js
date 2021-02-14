import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/another-route',
    search: '',
    hash: '',
    state: null,
  })
}));

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/spacex launch program/i);
  expect(linkElement).toBeInTheDocument();
});
