import React from 'react'
import { useData } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'

const Category = () => {
  const navigate = useNavigate()
  const { data } = useData()

  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((curElem) => curElem[property])
    return [...new Set(newVal)]
  }

  const categoryOnlyData = getUniqueCategory(data, "category")
  
  return (
    <div className="min-h-screen bg-[var(--ivory)] py-24 px-6 md:px-16 flex flex-col items-center">
      
      {/* ✨ Header */}
      <div className="text-center mb-20">
        <h2 className="text-[var(--charcoal)] font-serif text-3xl md:text-5xl tracking-[0.25em] uppercase mb-5">
          Collections
        </h2>

        <p className="text-[var(--gold-deep)] text-sm tracking-widest uppercase">
          Curated for you
        </p>

        <div className="w-20 h-[2px] bg-[var(--gold)] mx-auto mt-6"></div>
      </div>

      {/* 💎 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {
          categoryOnlyData?.map((product, index) => {
            return (
              <button 
                key={index}
                onClick={() => navigate('/products', { state: { category: product } })}
                className="
                  group relative w-full text-left
                  bg-white/80 backdrop-blur-md
                  p-10
                  border border-[var(--beige)]
                  rounded-[18px]

                  transition-all duration-500 ease-out
                  hover:-translate-y-3
                  hover:border-[var(--gold)]
                  hover:shadow-[0_20px_40px_-15px_rgba(200,155,94,0.25)]

                  overflow-hidden flex flex-col justify-between h-[220px]
                "
              >

                {/* ✨ Glow layer */}
                <div className="
                  absolute inset-0 
                  bg-[radial-gradient(circle_at_top_left,var(--gold-glow),transparent_70%)]
                  opacity-0 group-hover:opacity-20 
                  transition duration-500
                "></div>

                {/* 🌿 Index */}
                <div className="relative z-10">
                  <span className="text-[var(--gold-deep)] text-xs tracking-[0.2em] font-medium">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>

                {/* 💎 Content */}
                <div className="relative z-10 flex flex-col gap-5">
                  
                  <h3 className="
                    text-[var(--charcoal)] 
                    font-serif text-xl md:text-2xl 
                    tracking-[0.12em] uppercase

                    group-hover:text-[var(--purple)]
                    transition-colors duration-500
                  ">
                    {product}
                  </h3>

                  {/* ✨ Explore link */}
                  <div className="flex items-center gap-3">
                    
                    <span className="
                      text-[var(--teal)] text-[11px] font-semibold tracking-widest uppercase
                      opacity-0 -translate-x-6
                      group-hover:opacity-100 group-hover:translate-x-0
                      transition-all duration-500
                    ">
                      Explore
                    </span>

                    <div className="
                      h-[1px] w-8 bg-[var(--beige)]
                      group-hover:bg-[var(--teal)]
                      group-hover:w-16
                      transition-all duration-500
                    "></div>
                  </div>

                </div>

              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default Category