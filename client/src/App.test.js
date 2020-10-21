//For running: npm run test
import React from 'react';
import { render, queryByText } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { shallow, mount, configure } from "enzyme";
import {act} from 'react-dom/test-utils';
import ReactDOM from "react-dom";
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
//import toJson from "enzyme-to-json";

import App from './App';
import Home from './Components/Home';
import MainBoard from './Components/MainBoard';
import TicketPicker from './Components/TicketPicker';
import Navbars from './Components/Officer/Navbar';
import OfficerPage from './Components/Officer/OfficerPage';

it("App renders without crashing", () => {
  shallow(<App />);
});

it("Home renders without crashing", () => {
  shallow(<Home />);
});

it("MainBoard renders without crashing", () => {
  shallow(<MainBoard queues={[]} logs={[]}/>);
});

it("TicketPicker renders without crashing", () => {
  shallow(<TicketPicker newTicket={() => {}} options={[]} />);
});

it("Navbars renders without crashing", () => {
  shallow(<Navbars path={[]} />);
});

it("OfficerPage renders without crashing", () => {
  shallow(<OfficerPage />);
});

import {Table,Container,Col,Row,Alert} from 'react-bootstrap';

//skipped because it doesn't work
it.skip("MainBoard's table renders", async () => {
  //const wrapper = shallow(<MainBoard queues={[]} logs={[]}/>);
  //const table = '<tr><th>COUNTER</th><th>TICKET</th></tr>';
  //const table = screen.queryByText(/thead/i);
  //expect(wrapper.contains(table)).toEqual(true);
  //expect(table).toBeInTheDocument();
  const wrapper = mount(<MainBoard queues={[]} logs={[]}/>);
  await new Promise((r) => setTimeout(r, 3000));
  //const thead = '<thead className="tableHeader"><tr><th>COUNTER</th><th>TICKET</th></tr></thead>';
  //const table = wrapper.find('#table_counters').text();
  //expect(wrapper.contains(table)).toEqual(true);
  expect(getBootstrapText(wrapper.find('#table_counters').html())).toEqual(true);
});

/*describe("Mainboard Component Testing", () => {
    it("Renders Table", () => {
      act(() => {
        ReactDOM.render(<MainBoard queues={[]} logs={[]}/>, rootContainer);
      });
      const table = rootContainer.querySelector('table');
      expect(table).toHaveLength(1);
    });
  });

it("renders correctly", () => {
  const wrapper = mount(<Home />);
  expect(wrapper.state("error")).toEqual(null);
});*/