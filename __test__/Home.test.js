import { render } from '@testing-library/react-native';
import Home from '../screens/Home';

jest.mock("../screens/Stock", () => "Stock");

test('header should exist containing text WarehouseApp', async () => {
    const { getByText } = render(<Home />);
    const header = await getByText('WarehouseApp');
    expect(header).toBeDefined();
});
