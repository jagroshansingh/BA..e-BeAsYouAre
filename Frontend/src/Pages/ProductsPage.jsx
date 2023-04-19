import {
  AspectRatio,
  Box,
  Checkbox,
  Container,
  Divider,
  Heading,
  Hide,
  Input,
  Link,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import PriceSlider from "../Components/PriceSlider";
import ProductCard from "../Components/ProductCard";
import SearchPanel from "../Components/SearchPanel";
import { SearchContext } from "../Contexts/SearchContextProvider";

export default function ProductsPage() {
  const { search } = useContext(SearchContext);
  const [products, setproducts] = useState([]);
  const [price, setprice] = useState(4800);
  useEffect(() => {
    const FtchData = async () => {
      try {
        let res = await axios({
          method: "get",
          url: `${process.env.REACT_APP_URL}/products?location=${search}`,
        });
        console.log(res)
        let priceFiltered=res.data.filter((prod)=>prod.price<=price)     
        setproducts(priceFiltered);
      } catch (error) {
        console.error(error);
      }
    };
    FtchData();
  }, [search,price]);

  return (
    <Box px={10}>
      <SearchPanel />

      <Stack direction="row" spacing={4}>
        <Hide below="md">
          <VStack
            w={{ sm: "0%", md: "30%" }}
            border="0px solid grey"
            align="flex-start"
          >
            <Heading size="md">Traveller Experience</Heading>
            <Checkbox size="lg" isChecked>LGBTQ welcoming:</Checkbox>
            <Text paddingLeft={6} textAlign="start">
              See properties that pledge to make all guests feel safe, welcome,
              and respected.
            </Text>

            <Checkbox size="lg">Bussiness Frendly:</Checkbox>
            <Text paddingLeft={6} textAlign="start">
            See properties with amenities to help you work comfortably, like WiFi and breakfast.
            </Text>

            <Checkbox size="lg">Family Friendly:</Checkbox>
            <Text paddingLeft={6} textAlign="start">
            See properties that include family essentials like in-room conveniences and activities for the kids.
            </Text>
            <Divider orientation="horizontal" />
            <br />
            <Heading size="md">Price</Heading>
            <Container direction="row">
              <PriceSlider setprice={setprice} />
            </Container>
          </VStack>
        </Hide>

        {products.length == 0 ? (
          <Box w="100%">
            <Box padding="6" boxShadow="lg" bg="white">
              <SkeletonCircle size="10" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
            <Box padding="6" boxShadow="lg" bg="white">
              <SkeletonCircle size="10" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
            <Box padding="6" boxShadow="lg" bg="white">
              <SkeletonCircle size="10" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
          </Box>
        ) : (
          <VStack
            w={{ base: "100%", sm: "100%", md: "70%" }}
            border="0px solid"
          >
            {products.map((product) => (
              <ProductCard product={product} key={product.id} id={product.id} />
            ))}
          </VStack>
        )}
      </Stack>
    </Box>
  );
}
