import { render, screen, renderHook } from '@testing-library/react';
import { Map } from 'leaflet';
import { Cities } from '../const/business';
import useMap from './use-map';


const EmptyComponent = () => (<div data-testid="empty"></div>);


const city = Cities[0];

describe('Hook: useMap', () => {
  it('should return map', () => {
    render(<EmptyComponent />);
    const mapContainer = screen.getByTestId('empty');

    expect(mapContainer).toBeEmptyDOMElement();

    const { result } = renderHook(() =>
      useMap({ current: mapContainer}, city),
    );

    const map = result.current;

    expect(map).toBeInstanceOf(Map);
    expect(mapContainer).not.toBeEmptyDOMElement();
  });
});
