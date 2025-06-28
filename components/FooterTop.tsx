import React from 'react';
import { LifeBuoy, Mail, MapPin, Phone } from 'lucide-react';

interface ContactItem {
	label: string;
	text: string;
	icon: React.ReactNode;
}

const data: ContactItem[] = [
	{
		label: 'Visit Us',
		text: 'Perth, Australia',
		icon: (
			<MapPin className="w-5 h-5 text-primary-main transition-colors group-hover:text-primary-main" />
		),
	},
	{
		label: 'Call Us',
		text: '+12 345 6789',
		icon: (
			<Phone className="w-5 h-5 text-primary-main transition-colors group-hover:text-primary-main" />
		),
	},
	{
		label: 'Help Center',
		text: 'Returns & Warranty Help',
		icon: (
			<LifeBuoy className="w-5 h-5 text-primary-main transition-colors group-hover:text-primary-main" />
		),
	},
	{
		label: 'Email Us',
		text: 'shopping@ecart.com',
		icon: (
			<Mail className="w-5 h-5 text-primary-main transition-colors group-hover:text-primary-main" />
		),
	},
];

const FooterTop = () => {
	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-b border-gray-200">
			{data.map((item, index) => (
				<div
					key={index}
					className="group flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
				>
					{item.icon}
					<div>
						<h3 className="font-semibold text-gray-800 group-hover:text-primary-main transition-colors">
							{item.label}
						</h3>
						<p className="text-sm text-gray-600 mt-0.5">{item.text}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default FooterTop;
