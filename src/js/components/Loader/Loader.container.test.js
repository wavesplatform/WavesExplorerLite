import React from 'react';
import {shallow} from 'enzyme';

import {Loader} from './Loader.container';

jest.mock('../../services/ServiceFactory');
import ServiceFactory from '../../services/ServiceFactory';

describe('Loader', () => {
    const waitForAsync = () => new Promise(resolve => setImmediate(resolve));

    it('should render spinner when promise is in flight', async () => {
        expect.assertions(1);
        const promise = new Promise(() => {});
        const wrapper = shallow(<Loader fetchData={() => promise} />);

        await waitForAsync();
        wrapper.update();
        expect(wrapper).toMatchSnapshot();
    });

    it('should render children when promise is resolved', async () => {
        expect.assertions(1);
        const promise = Promise.resolve();
        const wrapper = shallow(<Loader fetchData={() => promise}>children</Loader>);

        await waitForAsync();
        wrapper.update();
        expect(wrapper).toMatchSnapshot();
    });

    it('should render error when promise is rejected', async () => {
        ServiceFactory.global.mockReturnValue({
            errorReportingService: jest.fn().mockReturnValue({
                captureException: jest.fn()
            })
        });

        expect.assertions(1);
        const wrapper = shallow(
            <Loader fetchData={() => Promise.reject(1)} errorTitle="Epic fail" />
        );

        await waitForAsync();
        wrapper.update();
        expect(wrapper).toMatchSnapshot();
    });
});
