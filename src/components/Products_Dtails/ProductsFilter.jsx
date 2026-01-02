import React, { useState } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";

export const ProductsFilter = () => {

    const [category, setcategory] = useState(false);
    const [gender, setGender] = useState(false);
    const [color, setColor] = useState(false);
    const [size, setSize] = useState(false);

    const ColorsData = ["Black", "White", "Red", "Blue", "Green"];
    const SizeData = ["S", "M", "L", "XL"];

    return (
        <nav>
            {/* TITLE */}
            <div className='text-[22px] ml-10 font-bold'>
                <h1>Products For You</h1>
            </div>

            {/* SORT */}
            <div className='border ml-10 mt-4 w-80 rounded-md flex px-3 py-2'>
                <p className='font-medium flex items-center justify-between w-full text-sm'>
                    Sort by :
                    <span className='font-semibold flex items-center gap-1'>
                        Relevance <RiArrowDropDownLine className='text-xl'/>
                    </span>
                </p>
            </div>

            {/* FILTER CARD */}
            <main className='border ml-10 mt-4 w-80 shadow-md rounded-lg flex flex-col'>

                <div className='mt-4 ml-4 border-b mr-4 pb-2'>
                    <h1 className='text-lg font-semibold text-gray-700'>FILTERS</h1>
                    <p className='text-xs text-gray-500'>100+ Products</p>
                </div>

                {/* CATEGORY */}
                <nav className='mt-3 ml-4 border-b mr-4 pb-2'>
                    <button
                        onClick={() => setcategory(!category)}
                        className='font-semibold text-lg flex justify-between w-full'
                    >
                        Category
                        <RiArrowDropDownLine className={`text-2xl transition ${category ? "rotate-180" : ""}`} />
                    </button>

                    {category && (
                        <ul className="mt-3 space-y-2 text-sm">
                            {["Woman Saree", "Woman Shoes", "Woman Kurti", "Woman Cap", "Woman Lehenga"].map(item => (
                                <li key={item} className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-purple-600" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </nav>

                {/* GENDER */}
                <nav className='mt-3 ml-4 border-b mr-4 pb-2'>
                    <button
                        onClick={() => setGender(!gender)}
                        className='font-semibold text-lg flex justify-between w-full'
                    >
                        Gender
                        <RiArrowDropDownLine className={`text-2xl transition ${gender ? "rotate-180" : ""}`} />
                    </button>

                    {gender && (
                        <div className='grid grid-cols-2 gap-2 mt-3 text-sm'>
                            {["Male", "Female", "Kids", "Girls"].map(g => (
                                <div key={g} className='border rounded-lg py-1.5 text-center cursor-pointer hover:border-purple-600'>
                                    {g}
                                </div>
                            ))}
                        </div>
                    )}
                </nav>

                {/* COLORS */}
                <nav className='mt-3 ml-4 border-b mr-4 pb-2'>
                    <button
                        onClick={() => setColor(!color)}
                        className='font-semibold text-lg flex justify-between w-full'
                    >
                        Colors
                        <RiArrowDropDownLine className={`text-2xl transition ${color ? "rotate-180" : ""}`} />
                    </button>

                    {color && (
                        <div className='grid grid-cols-3 gap-2 mt-3 text-sm'>
                            {ColorsData.map(c => (
                                <div
                                    key={c}
                                    className='border rounded-lg py-1.5 text-center cursor-pointer hover:border-purple-600'
                                >
                                    {c}
                                </div>
                            ))}
                        </div>
                    )}
                </nav>

                {/* SIZE */}
                <nav className='mt-3 ml-4 border-b mr-4 pb-3'>
                    <button
                        onClick={() => setSize(!size)}
                        className='font-semibold text-lg flex justify-between w-full'
                    >
                        Size
                        <RiArrowDropDownLine className={`text-2xl transition ${size ? "rotate-180" : ""}`} />
                    </button>

                    {size && (
                        <div className='grid grid-cols-4 gap-2 mt-3 text-sm'>
                            {SizeData.map(s => (
                                <label key={s} className="flex items-center gap-1 cursor-pointer">
                                    <input type="checkbox" className="accent-purple-600" />
                                    {s}
                                </label>
                            ))}
                        </div>
                    )}
                </nav>

            </main>
        </nav>
    )
}
