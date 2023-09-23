import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { useState } from 'react';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function SearchDate() {
	const [value, onChange] = useState<Value>(null);
	const navigate = useNavigate();

	const handleChange = (value: Value) => {
		onChange(value);
		if (value) {
			const v = value as [ValuePiece, ValuePiece];
			const from = v[0]?.toISOString();
			const to = v[1]?.toISOString();
			navigate(`/search-date?from=${from}&to=${to}`);
		}
	};

	return (
		<div className='flex-1'>
			<DateRangePicker
				onChange={handleChange}
				value={value}
				maxDate={new Date()}
			/>
		</div>
	);
}
