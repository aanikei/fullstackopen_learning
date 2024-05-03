const Filter = ({filterName, setNewFilter}) => {
return (
    <div>
        filter shown with: <input value={filterName} onChange={(event) => setNewFilter(event.target.value)} />
    </div>
    )
}

export default Filter
