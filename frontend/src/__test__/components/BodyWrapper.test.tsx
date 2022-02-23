import { render, screen } from '@testing-library/react';
import BodyWrapper from '../../components/BodyWrapper';

test('renders children', () => {
  render(
    <BodyWrapper>
      <div>test</div>
    </BodyWrapper>
  );

  const testElement = screen.getByText("test");
  expect(testElement).toBeInTheDocument();
});
