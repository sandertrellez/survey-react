import { FaStar } from 'react-icons/fa'
import './Rating.scss'
import { useState } from 'react'

interface RatingProps {
    count: number;
    size: number;
    value: number;
    setRating: (rating: number) => void;
    color: string;
    activeColor: string;
}

const Rating = ({count, size, value, setRating, color, activeColor}:RatingProps) => {

    const [localRating, setLocalRating] = useState<number>(value)
    const [hover, setHover] = useState(0);

    return (
        <div className='rating-container'>
            {
                [...Array(count)].map((star,index) =>{
                    const currentRating = index+1;
                    return(
                        <label key={index+1} className='rating'>

                        <input className='rating__input'
                            type="radio"
                            name="rating"
                            value={value}
                            onClick={()=>{
                                setLocalRating(currentRating)
                                setRating(currentRating)
                            }}
                        />
                            <FaStar className='rating__star'
                            size={size}
                            color={currentRating <= (hover || localRating)?activeColor:color}
                            onMouseEnter={()=>setHover(currentRating)}
                            onMouseLeave={()=>setHover(0)}
                            />
                        </label>
                    );
                })
            }
            <p>Tu calificación es {localRating}</p>
        </div>
    )

}

export default Rating