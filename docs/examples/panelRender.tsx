import React, { useState } from 'react';
// import moment, { Moment } from 'moment';
// import date-fns,{} from 'date-fns';
import Picker from '../../src/Picker';
import RangePicker from '../../src/RangePicker';
// import momentGenerateConfig from '../../src/generate/moment';
import momentGenerateConfig from '../../src/generate/dateFns';
import zhCN from '../../src/locale/zh_CN';
import '../../assets/index.less';
import './common.less';
import classNames from 'classnames';

const defaultStartValue = new Date('2019-09-03 05:02:03');
const defaultEndValue = new Date('2019-11-28 01:02:03');
const defaultValue: [Date, Date] = [null,null];

const calendarRender = (mergedInputProps) => {
  const { disabled, value } = mergedInputProps;
  // console.log(disabled, value, mergedInputProps);
  return (
    <div
      className={classNames(`calendar`, {
        ['calendar-selected']: value,
        ['calendar-disabled']: disabled,
      })}
    >
      <svg
        {...mergedInputProps}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.66667 10.9H6.44444V13.1H8.66667V10.9ZM13.1111 10.9H10.8889V13.1H13.1111V10.9ZM17.5556 10.9H15.3333V13.1H17.5556V10.9ZM19.7778 3.2H18.6667V1H16.4444V3.2H7.55556V1H5.33333V3.2H4.22222C2.98889 3.2 2.01111 4.19 2.01111 5.4L2 20.8C2 22.01 2.98889 23 4.22222 23H19.7778C21 23 22 22.01 22 20.8V5.4C22 4.19 21 3.2 19.7778 3.2ZM19.7778 20.8H4.22222V8.7H19.7778V20.8Z"
          fill="#868C9F"
        />
      </svg>
    </div>
  );
};
export default () => {
  const [date, setDate] = useState<Date>(null);
  const [dates, setDates] = useState<[Date, Date]>(defaultValue);

  return (
    <>
      <Picker<Date>
        generateConfig={momentGenerateConfig}
        locale={zhCN}
        allowClear
        value={date}
        // disabled={true}
        // onChange={(e) => console.log('date', e)}
        onChange={setDate}
        // defaultValue={defaultStartValue}
        inputRender={calendarRender}
      />
      <RangePicker<Date>
        generateConfig={momentGenerateConfig}
        locale={zhCN}
        allowClear
        value={dates}
        onChange={setDates}
        // defaultValue={defaultValue}
        // onChange={(e) => console.log('range', e)}
        panelRender={null}
        inputRender={calendarRender}
      />
    </>
  );
};
