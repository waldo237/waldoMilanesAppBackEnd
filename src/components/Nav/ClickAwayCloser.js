import React, { useRef, useEffect } from "react";
import PropTypes from 'prop-types'

const ClickAwayCloser = ({ children, exceptionById }) => {
    const classToggler = (ref) => {
        const timer = setTimeout(() => {
            ref.current.classList.add('display-none');
            ref.current.classList.remove('reverseFade');
        }, 300);
        ref.current.classList.add('reverseFade');
        return () => clearTimeout(timer);

    }
    const ref = useRef(null);
    useEffect(() => {
        const clickAwayHandler = () => {
            const handleClickOutside = (event) => {
                if (exceptionById) {
                    const excludedElement = document.getElementById(exceptionById);
                    if (ref.current && !ref.current.contains(event.target)
                        && !ref.current.contains(excludedElement)) {
                        classToggler(ref);
                    }

                } else if (ref.current && !ref.current.contains(event.target)) {
                    classToggler(ref);
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

    return <div className='display-none' ref={ref}>{children}</div>;
}
ClickAwayCloser.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    children:PropTypes.oneOfType([ PropTypes.array, PropTypes.object]).isRequired,
    exceptionById: PropTypes.string
};
ClickAwayCloser.defaultProps = {
    exceptionById: ''
}

export default ClickAwayCloser