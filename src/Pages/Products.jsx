import React, { useState } from 'react'
import { Slide_photos } from '@/components/ExtraWork/Slide_photos.jsx';
import { ProductsFilter } from '@/components/Products_Dtails/ProductsFilter';
import { Card_Itam } from '@/components/Products_Dtails/CardItam';

export const Products = () => {

    return (
        <section>

    
            <div className='mt-5'>
                <Slide_photos />       {/* THis For slide photos  */}
            </div>

            <div className=' mb-20 flex '>
                <ProductsFilter />    {/* This one show fillter section  */}
                <Card_Itam/>
            </div>


            
        </section>
    )
}
