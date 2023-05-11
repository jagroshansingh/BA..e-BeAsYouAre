import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  HStack,
  Heading,
  Hide,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import PriceSlider from "../Components/PriceSlider";
import ProductCard from "../Components/ProductCard";
import SearchPanel from "../Components/SearchPanel";
import { SearchContext } from "../Contexts/SearchContextProvider";

export default function ProductsPage() {
  const { search } = useContext(SearchContext);
  // console.log(search)
  const [products, setproducts] = useState([]);
  const [price, setprice] = useState(4800);
  useEffect(() => {
    const FtchData = async () => {
      try {
        let res = await axios({
          method: "get",
          url: `${process.env.REACT_APP_URL}/products?location=${search[0]}`,
        });
        // console.log(res)
        let priceFiltered = res.data.filter((prod) => prod.price <= price);
        setproducts(priceFiltered);
      } catch (error) {
        console.error(error);
      }
    };
    FtchData();
  }, [search, price]);

  return (
    <Box px={10}>
      <SearchPanel />

      <HStack justifyContent={"space-between"} position={'sticky'} top={'64px'} zIndex={2} backgroundColor={'white'} p={3}>
        <Box visibility={{ base: "block", md: "hidden" }}>
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Button rightIcon={<ChevronDownIcon />}>Filter</Button>
            </PopoverTrigger>
            <PopoverContent zIndex={2}>
              <Box>
                <PopoverHeader fontWeight="semibold">
                  <Heading size="md">Traveller Experience</Heading>
                </PopoverHeader>
                <PopoverBody>
                  <VStack align="flex-start">
                    <Checkbox size="lg" isChecked>
                      LGBTQ welcoming:
                    </Checkbox>
                    <Text paddingLeft={6} textAlign="start">
                      See properties that pledge to make all guests feel safe,
                      welcome, and respected.
                    </Text>

                    <Checkbox size="lg">Bussiness Frendly:</Checkbox>
                    <Text paddingLeft={6} textAlign="start">
                      See properties with amenities to help you work
                      comfortably, like WiFi and breakfast.
                    </Text>

                    <Checkbox size="lg">Family Friendly:</Checkbox>
                    <Text paddingLeft={6} textAlign="start">
                      See properties that include family essentials like in-room
                      conveniences and activities for the kids.
                    </Text>
                  </VStack>
                </PopoverBody>
              </Box>
              <Box>
                <PopoverHeader fontWeight="semibold">
                  <Heading size="md">Price</Heading>
                </PopoverHeader>
                <PopoverBody>
                  <Container direction="row">
                    <PriceSlider setprice={setprice} />
                  </Container>
                </PopoverBody>
              </Box>
            </PopoverContent>
          </Popover>
        </Box>
        <Box>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              SortBy
            </MenuButton>
            <MenuList>
              <MenuItem>Low to High</MenuItem>
              <MenuItem>High to Low</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    <br/>
      <Stack direction="row" spacing={4}>
        <Hide below="md">
          <VStack
            w={{ sm: "0%", md: "50%", lg:"30%" }}
            border="0px solid grey"
            align="flex-start"
            alignSelf={"start"}
            position={"sticky"}
            top={"17vh"}
            borderRight={"1px solid grey"}
            paddingRight={3}
          >
            <Heading size="md">Traveller Experience</Heading>
            <Checkbox size="lg" isChecked>
              LGBTQ welcoming:
            </Checkbox>
            <Text paddingLeft={6} textAlign="start">
              See properties that pledge to make all guests feel safe, welcome,
              and respected.
            </Text>

            <Checkbox size="lg">Bussiness Frendly:</Checkbox>
            <Text paddingLeft={6} textAlign="start">
              See properties with amenities to help you work comfortably, like
              WiFi and breakfast.
            </Text>

            <Checkbox size="lg">Family Friendly:</Checkbox>
            <Text paddingLeft={6} textAlign="start">
              See properties that include family essentials like in-room
              conveniences and activities for the kids.
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
            w={{ base: "100%", sm: "100%", md: "100%" }}
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
