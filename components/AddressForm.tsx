'use client';

import { useState } from 'react';
import { client } from '@/sanity/lib/client';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Props {
	onSuccess: () => void;
}

const AddAddressForm = ({ onSuccess }: Props) => {
	const [form, setForm] = useState({
		name: '',
		address: '',
		city: '',
		state: '',
		zip: '',
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const newAddress = {
				_type: 'address',
				name: form.name,
				address: form.address,
				city: form.city,
				state: form.state,
				zip: form.zip,
				default: false,
				publishedAt: new Date().toISOString()
			};

			await client.create(newAddress);
			onSuccess();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-3">
			<Input name="name" placeholder="Full Name" required value={form.name} onChange={handleChange} />
			<Input name="address" placeholder="Street Address" required value={form.address} onChange={handleChange} />
			<Input name="city" placeholder="City" required value={form.city} onChange={handleChange} />
			<Input name="state" placeholder="State" required value={form.state} onChange={handleChange} />
			<Input name="zip" placeholder="ZIP Code" required value={form.zip} onChange={handleChange} />
			<Button type="submit" disabled={loading} className="w-full">
				{loading ? 'Adding...' : 'Save Address'}
			</Button>
		</form>
	);
};

export default AddAddressForm;