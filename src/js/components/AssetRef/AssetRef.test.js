import React from 'react';
import {MemoryRouter} from 'react-router';
import renderer from 'react-test-renderer';

import {RoutedAssetRef} from './AssetRef.view';

describe('AssetRef', () => {
    it('should render', () => {
        const component = renderer
            .create(
                <MemoryRouter>
                    <RoutedAssetRef assetId="txid" text="something"/>
                </MemoryRouter>
            )
            .toJSON();

        expect(component).toMatchSnapshot();
    });
});
