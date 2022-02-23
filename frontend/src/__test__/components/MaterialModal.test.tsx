import { render, screen } from '@testing-library/react';
import MaterialModal from '../../components/MaterialModal';

test('It should contain its children', () => {
  render(
    <MaterialModal open={true} handleClose={() => {}}>
      <div>test</div>
    </MaterialModal>
  );

  const testDiv = screen.getByText(/test/i);
  expect(testDiv).toBeInTheDocument();
});
