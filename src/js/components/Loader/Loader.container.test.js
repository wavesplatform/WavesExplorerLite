import React from 'react';
import {shallow} from 'enzyme';

import {Loader} from './Loader.container';

jest.mock('../../services/ServiceFactory');
import ServiceFactory from '../../services/ServiceFactory';

describe('Loader', () => {
    it('should render spinner when promise is in flight', () => {
        const promise = new Promise(() => {});
        const wrapper = shallow(<Loader fetchData={() => promise} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render children when promise is resolved', async () => {
        expect.assertions(1);
        const promise = Promise.resolve();
        const wrapper = shallow(<Loader fetchData={() => promise}>children</Loader>);

        await promise;
        expect(wrapper).toMatchSnapshot();
    });

    it('should render error when promise is rejected', () => {
        ServiceFactory.global.mockReturnValue({
            errorReportingService: jest.fn().mockReturnValue({
                captureException: jest.fn()
            })
        });

        expect.assertions(1);
        const promise = Promise.reject(1);
        const wrapper = shallow(
            <Loader fetchData={() => promise} errorTitle="Epic fail" />
        );

        return promise.catch(() => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
