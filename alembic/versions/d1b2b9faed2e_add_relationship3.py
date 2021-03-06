"""Add Relationship3

Revision ID: d1b2b9faed2e
Revises: bbc710bad391
Create Date: 2022-02-14 08:00:43.299900

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd1b2b9faed2e'
down_revision = 'bbc710bad391'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.create_foreign_key('fk_user', 'user', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.drop_constraint('fk_user', type_='foreignkey')

    # ### end Alembic commands ###
