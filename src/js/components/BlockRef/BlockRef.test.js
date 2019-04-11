import React from 'react';
import {MemoryRouter} from 'react-router';
import renderer from 'react-test-renderer';

import {RoutedBlockRef} from './BlockRef.view';

describe('BlockRef', () => {
    it('should render', () => {
        const component = renderer.create(<MemoryRouter>
            <RoutedBlockRef height={4312} />
        </MemoryRouter>).toJSON();

        expect(component).toMatchSnapshot();
    });
});
