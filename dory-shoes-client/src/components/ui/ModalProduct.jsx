import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ProductModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Guía de talles de calzado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Para saber qué talle de zapato sos, medí tu pie desde el talón hasta la punta del dedo más largo.
          Luego, consultá la siguiente tabla:
        </p>
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>CM (Largo del pie)</th>
              <th>AR (Argentina)</th>
              <th>EU</th>
              <th>US (Mujer)</th>
              <th>US (Hombre)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>22.0</td><td>34</td><td>35</td><td>5</td><td>3.5</td></tr>
            <tr><td>22.5</td><td>35</td><td>36</td><td>5.5</td><td>4</td></tr>
            <tr><td>23.0</td><td>36</td><td>37</td><td>6</td><td>4.5</td></tr>
            <tr><td>23.5</td><td>37</td><td>38</td><td>6.5</td><td>5</td></tr>
            <tr><td>24.0</td><td>38</td><td>39</td><td>7</td><td>6</td></tr>
            <tr><td>24.5</td><td>39</td><td>40</td><td>7.5</td><td>6.5</td></tr>
            <tr><td>25.0</td><td>40</td><td>41</td><td>8</td><td>7</td></tr>
            <tr><td>25.5</td><td>41</td><td>42</td><td>8.5</td><td>8</td></tr>
            <tr><td>26.0</td><td>42</td><td>43</td><td>9</td><td>8.5</td></tr>
            <tr><td>26.5</td><td>43</td><td>44</td><td>9.5</td><td>9</td></tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;