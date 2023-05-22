import axios from "axios";
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Button,
  useDisclosure,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export const Admin = () => {
  const [allproducts, setAllProducts] = React.useState([]);
  const [edit, setEdit]=React.useState("")
  console.log(edit)
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEdit=(data)=>{
    setEdit(data)
    onOpen()
  }

  const handleChange=(e)=>{
    setEdit({...edit,[e.target.name]:e.target.value})
  }

  const handleSubmit=()=>{
    onClose()
    axios({
        method:'put',
        url:`${process.env.REACT_APP_URL}/admin/edit`
    })
  }

  React.useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/admin/all`,
    })
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Box display={"grid"} gridTemplateColumns={"repeat(3,1fr)"} gap={"1%"}>
        {allproducts?.map((product) => (
          <TableContainer key={product.id} border={"1px"}>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>DATA</Th>
                  <Th>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Id</Td>
                  <Td>{product.id}</Td>
                </Tr>
                <Tr>
                  <Td>location</Td>
                  <Td>{product.location}</Td>
                </Tr>
                <Tr>
                  <Td>name</Td>
                  <Td>{product.name}</Td>
                </Tr>
                <Tr>
                  <Td>price</Td>
                  <Td>{product.price}</Td>
                </Tr>
                <Tr>
                  <Td>image</Td>
                  <Td>
                    <a target="_blank" href={product.image}>
                      click me
                    </a>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Button onClick={()=>handleEdit(product)}>Edit</Button>
                  </Td>
                  <Td>
                    <Button colorScheme="red">Delete</Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        ))}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Location</FormLabel>
            <Input defaultValue={edit?.location} name="location" onChange={(e)=>handleChange(e)}/>
            <FormLabel mt={4}>Hotel Name</FormLabel>
            <Input defaultValue={edit.name} name="name" onChange={(e)=>handleChange(e)}/>
            <FormLabel mt={4}>Price</FormLabel>
            <Input defaultValue={edit.price} name="price" onChange={(e)=>handleChange(e)}/>
            <FormLabel mt={4}>Image</FormLabel>
            <Input defaultValue={edit.image} name="image" onChange={(e)=>handleChange(e)}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
