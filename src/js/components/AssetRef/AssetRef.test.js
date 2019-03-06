import React from 'react';
import renderer from 'react-test-renderer';

import {RoutedAssetRef} from './AssetRef.view';

describe('AssetRef', () => {
    it('should render', () => {
        const component = renderer
            .create(<RoutedAssetRef assetId="txid" text="something"/>)
            .toJSON();

        expect(component).toMatchSnapshot();
    });
});
