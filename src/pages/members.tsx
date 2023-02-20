import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import moment from 'moment';
import { useState } from 'react';

import Avatar from '@/components/lib/Avatar';
import Card from '@/components/lib/Card';
import FullPageLoader from '@/components/lib/FullPageLoader';
import Input from '@/components/lib/Input';
import Pagination from '@/components/lib/Pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/lib/Table';
import Text from '@/components/lib/Text';
import type { Meta as RequestMeta } from '@/graphql/__generated__/graphql';
import { GET_USERS } from '@/graphql/queries/user.queries';
import { useDebounce } from '@/hooks';
import PageLayout from '@/layouts/PageLayout';
import Meta from '@/templates/Meta';
import type IUser from '@/types/User.type';
import { defaultMeta } from '@/utils/constants';

const Members = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<(IUser | null)[]>([]);
  const [meta, setMeta] = useState<RequestMeta>(defaultMeta);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500) as string;

  const { loading } = useQuery(GET_USERS, {
    variables: { limit: 20, page, search: debouncedSearch },
    onCompleted(response) {
      setUsers(response?.getUsers?.data || []);
      setMeta(response?.getUsers?.meta || defaultMeta);
    },
  });

  return (
    <PageLayout
      title="Members"
      meta={
        <Meta
          title="Members | Aima's Writing Admin Panel"
          description="The list of members of Aima's Writing"
        />
      }
    >
      <div className="mb-10 flex justify-end">
        <div className="w-full max-w-[300px]">
          <Input
            type="search"
            placeholder="Search members..."
            startIcon={
              <Icon
                icon="ion:search"
                className="cursor-pointer text-xl text-black/20"
              />
            }
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
        </div>
      </div>

      <Card className="grid w-full gap-10">
        {users.length === 0 ? (
          <div className="my-20 grid place-items-center text-center">
            <Text>There are no members to display.</Text>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader
                items={[
                  `${meta.total} member${(meta.total || 0) > 1 ? 's' : ''}`,
                  'Email',
                  'Joined On',
                ]}
              />
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar
                          image={user?.image || undefined}
                          name={user?.name || undefined}
                        />
                        <Text>{user?.name}</Text>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Text>{user?.email}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>
                        {moment(Number(user?.createdAt || '')).format(
                          'MMMM DD, YYYY'
                        )}
                      </Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination count={meta.pages || 0} page={page} setPage={setPage} />
          </>
        )}
      </Card>

      {loading && <FullPageLoader />}
    </PageLayout>
  );
};

export default Members;
