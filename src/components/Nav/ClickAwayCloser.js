import React, { useRef, useEffect } from "react";
import PropTypes from 'prop-types'


const ClickAwayCloser = ({ children, exceptionById }) => {

    const ref = useRef(null);
    useEffect(() => {
        const clickAwayHandler = () => {
            const handleClickOutside = (event) => {
                if (exceptionById) {
                    const excludedElement = document.getElementById(exceptionById);
                    if (ref.current && !ref.current.contains(event.target)
                        && !ref.current.contains(excludedElement)) {
                        ref.current.classList.add('display-none');
                        console.log(excludedElement)
                    }
                   
                }else if (ref.current && !ref.current.contains(event.target)) {
                    ref.current.classList.add('display-none');
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
        if (exceptionById) {
            clickAwayHandler(ref, exceptionById)
        } else {
            clickAwayHandler(ref);
        }
    });

    return <div ref={ref}>{children}</div>;
}
ClickAwayCloser.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.array.isRequired,
    exceptionById: PropTypes.string
};
ClickAwayCloser.defaultProps = {
    exceptionById: ''
}

export default ClickAwayCloser