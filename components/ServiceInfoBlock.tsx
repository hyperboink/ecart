import {
  GitCompareArrows,
  Headset,
  ShieldCheck,
  Truck,
  Users
} from 'lucide-react';
import React from 'react';
import { Heading, SubHeading } from './ui/text';

const servicesInfoData = [
  {
    title: 'Free Delivery',
    description: 'On orders over $500',
    icon: <Truck size={24} />
  },
  {
    title: '24/7 Support',
    description: 'Always here to help',
    icon: <Headset size={24} />
  },
  {
    title: 'Global Shipping',
    description: 'Anywhere, anytime',
    icon: <GitCompareArrows size={24} />
  },
  {
    title: 'Money-Back Guarantee',
    description: 'Hassle-free returns',
    icon: <ShieldCheck size={24} />
  }
];

const ServicesInfoBlock = () => {
  return (
    <section className="py-8">
      <Heading className="mb-6 text-center" icon={Users}>
        Why Shop With Us?
      </Heading>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
        {servicesInfoData.map((info, index) => (
          <div
            key={index}
            className="flex items-start gap-3 border rounded-md p-4 hover:shadow-sm transition"
          >
            <div className="text-primary-main mt-1">
              {info.icon}
            </div>

            <div>
              <SubHeading className="font-medium text-base text-gray-900">
                {info.title}
              </SubHeading>
              <p className="text-gray-500">{info.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesInfoBlock;
