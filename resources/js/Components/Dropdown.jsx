import { Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { createContext, useContext, useState } from 'react';

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((prev) => !prev);

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);
    return (
        <>
            <div onClick={toggleOpen}>{children}</div>
            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />}
        </>
    );
};

const Content = ({ align = 'right', width = '48', children }) => {
    const { open, setOpen } = useContext(DropDownContext);

    let alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    if (align === 'left') alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';

    return (
        <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div
                className={`absolute z-50 mt-2 ${align === 'right' ? 'end-0' : 'start-0'} ${width === '48' ? 'w-48' : ''}`}
                onClick={() => setOpen(false)}
                style={{ border: '0.5px solid #2a0000', background: '#0a0a0a' }}
            >
                {children}
            </div>
        </Transition>
    );
};

const DropdownLink = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={className}
            style={{
                display: 'block',
                width: '100%',
                padding: '10px 16px',
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#666',
                textDecoration: 'none',
                transition: 'background 0.15s, color 0.15s',
                borderBottom: '0.5px solid #1a0000',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0f0000'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#666'; }}
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
