import React from 'react';
import Browse from './Browse';

import "./Fiction.scss";


export default function Fiction() {
    return (
        <div className='fiction-list'>
            <Browse
                urlList='combined-print-and-e-book-fiction'
                listName='fiction'
                title='Fiction Best Sellers'
            />
        </div>
    )
}