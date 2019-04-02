import React from 'react';
import {MemoryRouter} from 'react-router';
import renderer from 'react-test-renderer';

import {RoutedEndpointRef} from './EndpointRef.view';

describe('EndpointRef', () => {
    it('should render alias ref', () => {
        const component = renderer.create(<MemoryRouter>
            <RoutedEndpointRef endpoint="alias:W:test"/>
        </MemoryRouter>).toJSON();

        expect(component).toMatchSnapshot();
    });

    it('should render address ref', () => {
        const component = renderer.create(<MemoryRouter>
            <RoutedEndpointRef endpoint="3PPKDQ3G67gekeobR8MENopXytEf6M8WXhs"/>
        </MemoryRouter>).toJSON();

        expect(component).toMatchSnapshot();
    })
});
