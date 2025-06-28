import React from 'react';
import EmptyBlock from '../EmptyBlock';
import { ListCollapse } from 'lucide-react';

const OrderEmpty = () => {
  return (
    <EmptyBlock title='Ooops! No Orders!' content='Start shopping and place your first order.' icon={ListCollapse} />
  )
}

export default OrderEmpty;